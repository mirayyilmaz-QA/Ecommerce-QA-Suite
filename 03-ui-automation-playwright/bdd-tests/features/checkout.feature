Feature: Magento Checkout

    Background:
        Given I navigate to the Magento home page

    Scenario Outline: Checkout flow for different user types
        When the user completes the "<userType>" checkout flow
        Then a success message with an order ID should be displayed

        Examples:
            | userType   |
            | guest      |
            | registered |