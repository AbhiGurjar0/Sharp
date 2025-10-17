const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('A.txt', (err, data) => {
            let message = 'No message yet.';
            if (!err) {
                message = data.toString();
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`
                <html>
                    <head><title>Form</title></head>
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
            return res.end();
        });
        return;
    }

    if (url === "/message" && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const message = body;
            fs.writeFile('A.txt', message, err => {
                res.writeHead(302, { Location: '/' });
                return res.end();
            });
        });

        return;
    }

    // 404 fallback
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
