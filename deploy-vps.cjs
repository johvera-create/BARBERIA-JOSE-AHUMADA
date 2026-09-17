const { Client } = require('c:/Users/johan/OneDrive/Escritorio/Proyecto crm/node_modules/ssh2');
const fs = require('fs');

const tarFile = 'c:/Users/johan/Downloads/barberia-dist.tar.gz';
const conn = new Client();

conn.on('ready', () => {
  console.log('SSH conectado.');
  conn.exec('mkdir -p /root/barberia-build && rm -rf /root/barberia-build/*', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.sftp((err, sftp) => {
        if (err) throw err;
        console.log('Subiendo tarball al VPS...');
        const readStream = fs.createReadStream(tarFile);
        const writeStream = sftp.createWriteStream('/root/barberia-build/dist.tar.gz');
        writeStream.on('close', () => {
          console.log('Tarball subido. Reconstruyendo imagen y actualizando servicio Docker...');
          const cmds = [
            'cd /root/barberia-build',
            'tar -xzf dist.tar.gz',
            'echo "FROM nginx:alpine" > Dockerfile',
            'echo "COPY dist /usr/share/nginx/html" >> Dockerfile',
            'echo "EXPOSE 80" >> Dockerfile',
            'echo "CMD [\\"nginx\\", \\"-g\\", \\"daemon off;\\"]" >> Dockerfile',
            'docker build -t 127.0.0.1:5000/barberia-app:latest .',
            'docker push 127.0.0.1:5000/barberia-app:latest',
            'docker service update --image 127.0.0.1:5000/barberia-app:latest --force barberia_app',
            'echo "=== DEPLOY_SUBDOMINIO_EXITOSO ==="'
          ].join(' && ');

          conn.exec(cmds, (err, bStream) => {
            if (err) throw err;
            bStream.on('data', d => process.stdout.write(d.toString()));
            bStream.stderr.on('data', d => process.stderr.write(d.toString()));
            bStream.on('close', () => {
              conn.end();
              console.log('Listo. Despliegue en subdominio completado.');
            });
          });
        });
        readStream.pipe(writeStream);
      });
    });
  });
}).connect({
  host: '13.140.39.136',
  port: 22,
  username: 'root',
  password: process.env.SSH_PASSWORD || 'Flores2104!'
});
