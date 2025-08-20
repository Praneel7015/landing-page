# Deployment Guide

This guide explains how to deploy the Next.js landing page to AWS S3 and CloudFront.

## Prerequisites

Before you can deploy the site, you need to have the following installed and configured:

### 1. Node.js and pnpm

Make sure you have Node.js (version 18 or higher) and pnpm installed on your machine.

### 2. AWS Command Line Interface (CLI)

The deployment script uses the AWS CLI to upload files to S3 and to create a CloudFront invalidation.

*   **Install the AWS CLI:** If you don't have the AWS CLI installed, follow the official guide to [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) for your operating system.

*   **Configure the AWS CLI:** After installing the AWS CLI, you need to configure it with your AWS credentials.

    1.  **Get your AWS credentials:**
        *   Sign in to the AWS Management Console.
        *   Click on your username in the top right corner and select "Security credentials".
        *   Go to the "Access keys" section and click "Create access key".
        *   **Important:** Make sure to save the `Access key ID` and the `Secret access key`. You will not be able to see the secret access key again after you close the window.

    2.  **Run `aws configure`:** Open your terminal (or Git Bash on Windows) and run the following command:

        ```bash
        aws configure
        ```

    3.  **Enter your credentials:** You will be prompted to enter your AWS Access Key ID, AWS Secret Access Key, Default region name, and Default output format.

        ```
        AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
        AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
        Default region name [None]: us-east-1
        Default output format [None]: json
        ```

        *   Replace `YOUR_ACCESS_KEY_ID` and `YOUR_SECRET_ACCESS_KEY` with the credentials you just created.
        *   You can choose any region you prefer. `us-east-1` is a common choice.
        *   The default output format can be `json`.

## Automated Deployment with `deploy.sh`

The easiest way to deploy the site is to use the `deploy.sh` script.

### 1. Configure the Script

Before you run the script for the first time, you need to add your S3 bucket name and your CloudFront distribution ID to the script.

1.  Open `deploy.sh` in your code editor.
2.  Replace `"your-bucket-name"` with the name of your S3 bucket.
3.  Replace `"your-distribution-id"` with the ID of your CloudFront distribution.

### 2. Run the Script

1.  Open a bash-compatible terminal like **Git Bash** in the project's root directory.
2.  Make the script executable:

    ```bash
    chmod +x deploy.sh
    ```

3.  Run the script:

    ```bash
    ./deploy.sh
    ```

The script will build your Next.js application, upload the static files to your S3 bucket, and create a CloudFront invalidation to ensure your changes are live immediately.
