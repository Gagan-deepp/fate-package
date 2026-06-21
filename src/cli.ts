import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// Handling __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const splash = `
\x1b[38;5;216m ✨  Welcome to the Inevitable\x1b[0m
\x1b[38;5;216m  _____     _       \x1b[0m
\x1b[38;5;216m |  ___|_ _| |_ ___ \x1b[0m
\x1b[38;5;216m | |_ / _\` | __/ _ \\\x1b[0m
\x1b[38;5;216m |  _| (_| | |_  __/\x1b[0m
\x1b[38;5;216m |_|  \\__,_|\\__\\___|\x1b[0m
                     
 \x1b[32m🌿 A warm breeze for your next project.\x1b[0m
`;

async function run() {
    console.log(splash);

    // 1. Setup readline interface to ask questions
    const rl = readline.createInterface({ input, output });

    let includeJwt = true;
    try {
        const answer = await rl.question('🌿 Would you like to include JWT Authentication? (y/n, default: y): ');
        const cleanedAnswer = answer.toLowerCase().trim();
        if (cleanedAnswer === 'n' || cleanedAnswer === 'no') {
            includeJwt = false;
        }
    } catch (err) {
        console.error('Error reading inputs, defaulting to include JWT:', err);
    } finally {
        rl.close(); // Crucial to close readline or the process won't exit
    }

    const targetDir = process.cwd();
    const templateDir = path.join(__dirname, '../template');

    console.log('\n\x1b[38;5;216m%s\x1b[0m', '🌿 Preparing your workspace...');

    try {
        // Copy the template structure
        await fs.copy(templateDir, targetDir);

        // 2. Perform conditional modifications based on user choice
        if (!includeJwt) {
            // Remove the jwt.ts middleware file
            const jwtFilePath = path.join(targetDir, 'src/middleware/jwt.ts');
            if (await fs.pathExists(jwtFilePath)) {
                await fs.remove(jwtFilePath);
                console.log('\x1b[33m%s\x1b[0m', '🔧 Removed JWT middleware files.');
            }

            // Remove jsonwebtoken dependencies from package.json
            const pkgPath = path.join(targetDir, 'package.json');
            if (await fs.pathExists(pkgPath)) {
                const pkg = await fs.readJson(pkgPath);

                if (pkg.dependencies && pkg.dependencies['jsonwebtoken']) {
                    delete pkg.dependencies['jsonwebtoken'];
                }
                if (pkg.devDependencies && pkg.devDependencies['@types/jsonwebtoken']) {
                    delete pkg.devDependencies['@types/jsonwebtoken'];
                }

                await fs.writeJson(pkgPath, pkg, { spaces: 2 });
                console.log('\x1b[33m%s\x1b[0m', '🔧 Removed jsonwebtoken from package.json.');
            }
        }

        console.log('\n\x1b[32m%s\x1b[0m', '✨ Structure created successfully!');
        console.log('\x1b[38;5;216m%s\x1b[0m', 'Your project has bloomed. Follow the warm path ahead:');
        console.log('');
        console.log('  \x1b[1m1.\x1b[0m npm install');
        console.log('  \x1b[1m2.\x1b[0m npm run dev');
        console.log('');
        console.log('\x1b[38;5;216m%s\x1b[0m', 'Take a deep breath and start creating.');
    } catch (err) {
        console.error('Error copying template:', err);
    }
}
run();