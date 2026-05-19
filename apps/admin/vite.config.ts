import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.resolve(__dirname, '../..');
const contentDir = path.join(rootDir, 'content');

function sendJson(res: import('node:http').ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body, null, 2));
}

function safeJoin(base: string, relativePath: string) {
  const target = path.normalize(path.join(base, relativePath));

  if (!target.startsWith(base)) {
    throw new Error('Invalid path');
  }

  return target;
}

function listMarkdownFiles(directory: string) {
  const dirPath = path.join(contentDir, directory);

  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort()
    .map((fileName) => ({
      fileName,
      path: `${directory}/${fileName}`,
      content: fs.readFileSync(path.join(dirPath, fileName), 'utf8')
    }));
}

function readRequestBody(req: import('node:http').IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function contentApiPlugin(): Plugin {
  return {
    name: 'content-api',
    configureServer(server) {
      server.middlewares.use('/api/content', async (req, res) => {
        try {
          if (req.method === 'GET') {
            const jsonFiles = ['profile.json', 'education.json', 'skills.json', 'certifications.json', 'links.json'];
            sendJson(res, 200, {
              json: Object.fromEntries(
                jsonFiles.map((fileName) => [
                  fileName,
                  fs.readFileSync(path.join(contentDir, fileName), 'utf8')
                ])
              ),
              projects: listMarkdownFiles('projects'),
              awards: listMarkdownFiles('awards')
            });
            return;
          }

          if (req.method === 'POST') {
            const payload = JSON.parse(await readRequestBody(req)) as {
              path: string;
              content: string;
            };

            if (!payload.path || typeof payload.content !== 'string') {
              sendJson(res, 400, { error: 'path and content are required' });
              return;
            }

            const target = safeJoin(contentDir, payload.path);
            const extension = path.extname(target);

            if (!['.json', '.md'].includes(extension)) {
              sendJson(res, 400, { error: 'Only .json and .md files can be edited' });
              return;
            }

            if (extension === '.json') {
              JSON.parse(payload.content);
            }

            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, payload.content.trimEnd() + '\n', 'utf8');
            sendJson(res, 200, { ok: true });
            return;
          }

          sendJson(res, 405, { error: 'Method not allowed' });
        } catch (error) {
          sendJson(res, 500, {
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), contentApiPlugin()]
});
