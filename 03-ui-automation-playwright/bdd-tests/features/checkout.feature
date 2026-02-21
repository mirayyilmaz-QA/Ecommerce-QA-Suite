Feature: Magento Checkout

    Background:
        Given the user is on the Magento store home page

    Scenario Outline: Checkout flow for different user types
        When the user completes the <userType> checkout flow
        Then a success message with an order ID should be displayed

        Examples:
            | userType   |
            | guest      |
            | registered |