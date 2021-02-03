![Logo](../ClientApp/src/assets/images/logos/wheel.png)

<br>
<a href="../Readme.md">Business description</a>
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/dotnet.png)
<h2 style="color:orange">Backend API</h2>
Built with .NET Core v3.1, all the heavy lifting is done in C#. Entity Framework Core has the responsibility to query and alter the database. The directory structure is separated into two base directories Features and Infrastructure for easy identification and replication in other projects.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/mysql.png)
<h2 style="color:orange">Database</h2>
MySQL is the data store. Except the usual primary and foreign keys, constraints are used to prevent a record from deletion if it's used in another table.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/logging.png)
<h2 style="color:orange">Logging</h2>
All database errors are caught and reported by the back-end and stored in log files. After each database job is completed, regardless of the outcome, the users are informed with snackbar messages. The logging is completely customized, built from the ground up without any dependencies. The saved messages are simple, analytical and descriptive.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/identity.png)
<h2 style="color:orange">Controlled access</h2>
Identity Server is used, complete with password change and password reset. Email support is provided from either SendGrid, Outlook or Gmail. More email providers can be easily added if necessary.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/angular.png)
<h2 style="color:orange">Angular</h2>
Frontend user interaction with extensive use of services, necessary to provide the needed functionality. The version used is always the latest stable to ensure the minimum number of vulnerabilities.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/components.png)
<h2 style="color:orange">Custom components</h2>
Forty+ custom components have been created to serve the front-end, including a custom table which is injected into every list, thus keeping the host component clean. All data, including rows, headers and column widths are sent from the host to the table as arrays.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/services.png)
<h2 style="color:orange">Services</h2>
Twenty-five+ services are keeping the components clean and do all the interactions with the back-end including field validation, messaging, keyboard shortcuts and PDF creation.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/material.png)
<h2 style="color:orange">Material Design</h2>
Used throughout the application, with custom CSS rules overriding the default styles in many occasions. This is not your everyday application: I care more than just ‘getting the job done’. That is why theming, pixel perfect alignments and animations play an important part.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/theming.png)
<h2 style="color:orange">Theming</h2>
The users must have an experience. They can select from many themes according to the lighting conditions or their personal taste. Additional themes can be easily added, since the CSS styles that are responsible for theming are kept separate from the rest of the styles.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/animations.png)
<h2 style="color:orange">Animations</h2>
Light usage of the Angular Animations Module has been used, to enhance the UI and make it less static.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/languages.png)
<h2 style="color:orange">UI Languages</h2>
Support for any language is done with my custom implementation, completely without Angular i18n. The users can switch language at any time and the changes are reflected application-wide instantaneously without the need to logout. All elements are affected, including table headers and snackbar messages. The addition of any number of languages can be done with ease because, as in theming, the language files are kept separate.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/cypress.png)
<h2 style="color:orange">E2E Testing</h2>
Cypress is used with extensive tests that mimic the user interaction are covering all critical parts of the application to ensure code quality, ease of maintenance and extensibility. The parts that are tested are named for easy identification.
<br>
<br>
<br>

![](../ClientApp/src/assets/images/logos/charting.png)
<h2 style="color:orange">Statistics and Charts</h2>
With a couple of clicks, the sum of persons per customer, destination, driver, etc, is calculated and displayed. Three periods are shown: User selected, MTD and YTD. For easy comparison each sum is compared to last year’s persons.