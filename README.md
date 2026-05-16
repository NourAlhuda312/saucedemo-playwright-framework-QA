# SauceDemo QA Automation Framework

## Software Testing and Quality Assurance — Homework Assignment #3

**Student:** Nour Al-Huda Daraghmeh  
**Supervisor:** Dr. Moamin Abughazala  
**Course:** Software Testing and Quality Assurance  
**Semester:** Second Semester 2025/2026  

---

## Project Overview

This project is a complete **End-to-End Testing Framework** developed using **Playwright with TypeScript** for the SauceDemo web application:

https://www.saucedemo.com/

The goal of this project is to test the main e-commerce user flows in a structured, maintainable, and professional way. The framework was designed using real QA automation practices such as:

- Page Object Model
- Feature-based test files
- Environment configuration using `.env`
- Browser state authentication
- Cross-browser testing
- Test hooks
- Reusable helper methods
- HTML test reports
- Screenshots, videos, and traces on failure

This project does not only check if the website works. It also demonstrates how a QA engineer thinks: analyzing requirements, designing meaningful test scenarios, validating expected behavior, and organizing automation code for maintainability.

---

## Website Under Test

**Application:** SauceDemo  
**URL:** https://www.saucedemo.com/  

SauceDemo is a sample e-commerce website used for testing login, product listing, cart, checkout, and sorting features.

---

## Features Tested

The automation framework covers the required homework features:

| Feature | Covered |
|---|---|
| Login | Yes |
| Add one item to cart | Yes |
| Add multiple items to cart | Yes |
| Verify cart items | Yes |
| Checkout one item | Yes |
| Checkout multiple items | Yes |
| Remove one item from cart | Yes |
| Remove multiple items from cart | Yes |
| Sort products A-Z | Yes |
| Sort products by price High to Low | Yes |
| Cross-browser execution | Yes |
| Browser state login reuse | Yes |
| Page Object Model | Yes |
| Hooks | Yes |
| `.env` configuration | Yes |

---

## Test Coverage Matrix

| Requirement ID | Requirement | Test File | Test Case |
|---|---|---|---|
| RQ-LOGIN-01 | Valid user can login | `login.spec.ts` | `TC-LOGIN-01` |
| RQ-LOGIN-02 | Locked-out user cannot login | `login.spec.ts` | `TC-LOGIN-02` |
| RQ-LOGIN-03 | Invalid password is rejected | `login.spec.ts` | `TC-LOGIN-03` |
| RQ-LOGIN-04 | Empty login fields show validation error | `login.spec.ts` | `TC-LOGIN-04` |
| RQ-CART-01 | Add one product to cart | `add-to-cart.spec.ts` | `TC-CART-01` |
| RQ-CART-02 | Add multiple products to cart | `add-to-cart.spec.ts` | `TC-CART-02` |
| RQ-REMOVE-01 | Remove one product from inventory page | `remove-cart.spec.ts` | `TC-REMOVE-01` |
| RQ-REMOVE-02 | Remove one product from cart page | `remove-cart.spec.ts` | `TC-REMOVE-02` |
| RQ-REMOVE-03 | Remove one item from multiple cart items | `remove-cart.spec.ts` | `TC-REMOVE-03` |
| RQ-REMOVE-04 | Remove all items from cart | `remove-cart.spec.ts` | `TC-REMOVE-04` |
| RQ-CHECKOUT-01 | Checkout one item successfully | `checkout.spec.ts` | `TC-CHECKOUT-01` |
| RQ-CHECKOUT-02 | Checkout multiple items successfully | `checkout.spec.ts` | `TC-CHECKOUT-02` |
| RQ-CHECKOUT-03 | First name is required | `checkout.spec.ts` | `TC-CHECKOUT-03` |
| RQ-CHECKOUT-04 | Last name is required | `checkout.spec.ts` | `TC-CHECKOUT-04` |
| RQ-CHECKOUT-05 | Postal code is required | `checkout.spec.ts` | `TC-CHECKOUT-05` |
| RQ-SORT-01 | Sort products from A to Z | `sort.spec.ts` | `TC-SORT-01` |
| RQ-SORT-02 | Sort products by price High to Low | `sort.spec.ts` | `TC-SORT-02` |

---
