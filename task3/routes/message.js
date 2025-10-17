const fs = require('fs');
const path = require('path');

function handleRoutes(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile(path.join(__dirname, '../A.txt'), (err, data) => {
            const message = err ? 'No message yet.' : data.toString();

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>Message Form</title></head>
                    <body>
                        <h1>Submit a Message</h1>
                        <p>${message}</p>
                        <form action="/message" method="POST">
                            <input type="text" name="message" required />
                            <button type="submit">Send</button>
                        </form>
                    </body>
                </html>
            `);
        });
    }

    else if (url === '/message' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const message = body.split('=')[1].replace(/\+/g, ' ');
            fs.writeFile(path.join(__dirname, '../A.txt'), message, () => {
                res.writeHead(302, { Location: '/' });
                res.end();
            });
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
}

module.exports = { handleRoutes };
