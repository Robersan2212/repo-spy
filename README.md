# repo-spy

# Overview

I developed a command-line tool called "Repo-Spy" using TypeScript to deepen my understanding of asynchronous programming and API integration within a strongly typed environment. The software leverages TypeScript’s type system to ensure data integrity while interacting with the GitHub REST API. It asynchronously fetches key repository information—such as star count, forks, open issues, and primary language—and displays a clear, formatted summary directly in the terminal.

My purpose in creating this software was to enhance my skills in writing clean, maintainable TypeScript code that handles real-world asynchronous operations using async/await. Additionally, I aimed to practice designing modular applications with a clear separation of concerns, improving both code organization and testability. This project also helped me gain practical experience working with external APIs and processing JSON data efficiently, which are critical skills for modern software development.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

Development Tools

    . Visual Studio Code (VS Code): The integrated development environment (IDE) used for writing and debugging the application's code.

    . Node.js: The runtime environment that allows the application to be executed from the command line.

    . npm (Node Package Manager): The package manager used to install and manage all project dependencies.

    . TypeScript Compiler (tsc): The official tool for compiling TypeScript code into executable JavaScript.

    . ts-node: A development utility used to run TypeScript files directly, which speeds up the testing and development cycle.

    . Jest: A testing framework used to write and run unit tests, ensuring that individual components of the software function correctly.

    . ESLint: A static code analysis tool (linter) used to enforce code quality and a consistent style across the project.

Programming Language

    . TypeScript: A statically typed superset of JavaScript, chosen to write the application's source code to ensure type safety and improve maintainability.

Libraries and APIs

    . Axios: A promise-based HTTP client library used to make asynchronous requests to the GitHub REST API.

    . Commander.js: A library for building command-line interfaces, used to parse arguments and options provided by the user.

    . Chalk: A terminal string styling library used to add color and formatting to the output, making it more readable and visually appealing.


# Useful Websites

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Official Documentation](https://www.nodejs.tech/ro/docs)
- [Axios Documentation](https://github.com/axios/axios )
- [Commander.js Guide](https://blog.logrocket.com/building-typescript-cli-node-js-commander/)
- [Chalk Documentation](https://github.com/chalk/chalk)
- [Jest Testing Framework Tutorial](https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/)
- [ESLint Documentation](https://eslint.org/docs/latest/use/ )
- [GitHub REST API Documentation](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api)

# Future Work

- Add progress indicators for API calls.
- Create configuraion file for default settings. 
- Add auto compleation for repository names. 
