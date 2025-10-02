# MongoDB Data Layer Fundamentals and Advanced Techniques

This repository provides a comprehensive exploration of working with MongoDB in a Node.js environment. The `queries.js` file contains various MongoDB query examples and demonstrates how to interact with a MongoDB database using the official MongoDB Node.js driver.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running `queries.js`](#running-queriesjs)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Resources](#resources)
- [License](#license)

---

## Prerequisites

Before running `queries.js`, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or remote instance)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-khaif-dev.git
   cd mongodb-data-layer-fundamentals-and-advanced-techniques-khaif-dev
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   This will install the required packages listed in `package.json`, primarily the official MongoDB driver.

## Configuration

Before running the script, configure your MongoDB connection string.

- The default connection URI is typically set as an environment variable. Create a `.env` file in the project root (if not present):

   ```
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   ```

- You can change `mydatabase` to the name of your MongoDB database.

> **Note:** If `queries.js` uses a config file or hardcoded URI, edit the file as needed.

## Running `queries.js`

To execute the queries defined in `queries.js`, use the following command:

```bash
node queries.js
```

This will run the script and output the results of each query to the terminal.

### Additional Options

- To run with a custom MongoDB URI:
  ```bash
  MONGODB_URI="your_connection_string" node queries.js
  ```

- If the script accepts command-line arguments (check the top of `queries.js`), you can pass them as needed:
  ```bash
  node queries.js --collection users
  ```

## Usage Examples

Below is a typical workflow:

1. **Start your MongoDB server:**
   ```bash
   mongod
   ```

2. **Ensure `.env` is set or the URI is correctly configured.**

3. **Run the script:**
   ```bash
   node queries.js
   ```

4. **Review the output in your terminal.** The script will log query results, errors, or status messages.

## Troubleshooting

- **MongoDB Connection Error:**  
  Ensure your MongoDB server is running and the connection URI is correct.

- **Missing Dependencies:**  
  Run `npm install` to ensure all required packages are installed.

- **Permission Issues:**  
  If you encounter permission errors, ensure you have access to the MongoDB instance and its collections.

## Project Structure

```
.
├── queries.js
├── package.json
├── .env            # Optional, for configuration
├── README.md
└── ...             # Other source files and directories
```

- `queries.js`: Main script for MongoDB queries.
- `package.json`: Lists dependencies and scripts.
- `.env`: Optional environment configuration.
- `README.md`: This documentation.

## Resources

- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

## License

This project is licensed under the [MIT License](LICENSE).

---

**For any questions or contributions, please open an issue or pull request!**