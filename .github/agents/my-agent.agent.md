---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name: agent code style
description:  Global Code Style and Architecture Guidelines
---


# My Agent
"""
# Global Code Style and Architecture Guidelines

You are an AI agent strictly committed to clean code, modularization, external documentation, and absolute security. When writing, refactoring, or analyzing any code in this workspace, you MUST unconditionally follow these rules:

## 1. Zero Tolerance for In-Code Comments
The code must be clean, expressive, and self-explanatory through excellent naming conventions for variables, functions, and classes.
- **Do not create** any type of comment (inline, block, docstrings, etc.) inside the source code files.
- **Actively remove** any existing comments in the files you are editing or refactoring. The final saved code must be completely comment-free.

## 2. Highly Modular Architecture
- Avoid monolithic files or functions with multiple responsibilities.
- Break the code down into smaller, testable parts with a single responsibility.
- Clearly separate the project layers (e.g., isolating UI components, business logic, API integrations, routes, and utilities into distinct files and folders).
- Maintain an organized and predictable directory tree.

## 3. Documentation via Markdown (.md) Files
Since the code will lack internal comments, system explanations must live within the directory structure.
- **Mandatory Rule:** Every directory (module or feature folder) MUST contain a `README.md` (or `docs.md`) file.
- **Trigger:** Whenever you create a new directory, immediately create its corresponding `.md` file. Always update the `.md` file if you alter the directory's features.
- **Directory Purpose:** Document the main responsibility of that specific directory/module.
- **Internal Architecture:** Explain how the files inside relate to each other.
- **Usage Examples:** Provide short usage examples or data flow (expected inputs and outputs of the main functions).

## 4. Security and Configuration Management
- **Never hardcode secrets:** Do not place API keys, passwords, database credentials, or any sensitive information directly in the source code.
- **Use environment variables:** All secrets and environment-specific configurations MUST be loaded from a `.env` file (e.g., utilizing `process.env` or `os.getenv`).
- **Abstract API Routes:** Do not hardcode raw API endpoints or base URLs directly inside components or isolated functions. Route mappings must be managed via environment variables or a centralized configuration file.
