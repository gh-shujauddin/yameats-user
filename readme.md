# Yam Eats App

Welcome to the Yam Eats App! This project is a mobile application built with React Native and AWS Amplify, allowing users to browse restaurants, add dishes to their baskets, place orders, and track live orders on a map.

## Features

- **Restaurant Browsing**: Users can view a list of available restaurants.
- **Dish Management**: Users can add dishes to their baskets.
- **Order Placement**: Users can place orders directly from the app.
- **Live Order Tracking**: Users can track their orders in real-time on a map.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- React Native development environment set up.
- AWS Amplify CLI installed and configured.

### Installation

1. Clone the repository:
    
```sh
    git clone https://github.com/gh-shujauddin/yam-eats-app.git
  ```
6c0df167-66d3-402e-bc88-2595b810e8d1

2. Navigate to the project directory:
    
```sh
    cd yam-eats-app
    ```

3. Install the dependencies:
    
```sh
    npm install
    ```


### Configuration

1. Initialize AWS Amplify in your project:
    
```sh
    amplify init
    ```
e6305856-94d0-4008-ba0e-43c29b7fd7dd

2. Add the necessary Amplify categories (e.g., Auth, API, Storage):
    
```sh
    amplify add auth
    amplify add api
    amplify add storage
    ```
3. Push the configuration to AWS:
    ```sh
    amplify push
    ```

### Running the Application

1. Start the React Native development server:
    ```sh
    npm start
    ```
2. Run the app on your emulator or physical device:
    ```sh
    npm run android   # For Android
    npm run ios       # For iOS
    ```

## Usage

- **Browse Restaurants**: Open the app and navigate to the "Restaurants" section to see a list of available restaurants.
- **Add Dishes to Basket**: Select a restaurant and add dishes to your basket.
- **Place an Order**: Review your basket and place an order.
- **Track Live Orders**: Navigate to the "Orders" section to track your order in real-time on a map.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Email: your-email@example.com
- GitHub: [yourusername](https://github.com/yourusername)

---

Thank you for using the Yam Eats App! We hope it enhances your dining experience.
