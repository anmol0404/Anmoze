import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs/promises';

async function getJsonData() {
  try {
    // Get the current module's URL
    const __filename = fileURLToPath(import.meta.url);
    
    // Get the directory name of the current module
    const __dirname = dirname(__filename);

    // Resolve the path to the data.json file
    const filePath = resolve(__dirname, '../data.json');

    // Read the file asynchronously
    const rawData = await readFileSync(filePath, 'utf-8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(rawData);

    return jsonData;
  } catch (error) {
    console.error('Error reading or parsing the file:', error.message);
    throw error;
  }
}


function iterateWithDelay(index, result) {
    if (index < result.length) {
      const user = result[index];
      const userId = user.id || '';
      const userName = `${user.firstName || ''}`.trim();
      const userUsername = user.username || '';
      const accessHash = user.accessHash || '';
      
      // Assuming run is a function from another module, replace 'run' with the actual function
      // run(userId, accessHash);
  
      console.log(`User ID: ${userId}, Name: ${userName}, Username: ${userUsername}, accessHash: ${accessHash}`);
  
      // Set a delay of 5 seconds before processing the next user
      setTimeout(() => {
        iterateWithDelay(index + 1, result);
      }, 5000);
    }
  }
  

  
// Export the function
export { getJsonData,iterateWithDelay };
