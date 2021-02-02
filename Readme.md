![Logo](ClientApp/src/assets/images/logos/wheel.png)

<br>

<h2 style="color:orange">Who we are</h2>
We are a privately-owned cruise line based in <a href="https://en.wikipedia.org/wiki/Corfu">Corfu</a>, Greece. We operate from April to October and organize daily boat trips to the <a href="https://en.wikipedia.org/wiki/Corfu#/media/File:Corfu_topographic_map-en.svg">surrounding islands</a> and the nearby coast of the greek mainland. 

<br>
<br>

<h2 style="color:orange">What we do</h2>
Our job, except from organizing the trips themselves, is to pickup and transfer the persons who book the trips from their staying locations around the island to various ports. They then board one of our ships, taken to their destination and brought back in the evening.

<br>
<br>

<h2 style="color:orange">What this application is about</h2>
We need to keep record of the persons who book a boat trip because they need to be transfered from their accomodation to a particular port.

<br>
<br>

<h2 style="color:orange">In detail</h2>
Let's see how we operate with an example: Suppose you're on holiday with your family, and, as most visitors do, you want to see the surrounding islands and maybe visit a couple of beaches in the mainland. So, you contact our office, usually through the manager of your accommodation, and the typical questions you'll have to answer are these: Where you wish to go, when and how many others will be going with you. Then, you are given the exact time you should be ready and waiting to be picked up. The transfer from your accommodation to the port is done by private coaches. In some cases, mini buses and taxis are used, if for example you stay somewhere remote and the use of a coach is inconvenient. After the drop-off, you board one of our ships, enjoy yourselves wherever you go and come back. Obviously you'll be driven back to your accommodation, so you get back on the coach and... That was it! Enjoyed? We hope so!

<br>
<br>

<h2 style="color:orange">The task</h2>

We need to keep track of every group of persons who book a trip with us. Coaches will have to be booked with their <a href="#drivers">drivers</a> and pickups to be scheduled. This is how we do it: <a href="#newtransfer">Log every group of persons</a>, according to each phone call or a direct visit in one of our offices. As has already been mentioned, we need to know the date, the <a href="#destinations">destination</a>, the pickup point and how many persons are travelling. At a later stage, this group will be given to a driver which will be in charge of the transfer. A typical conversation would be something along these lines: “Hello, I’m calling from the Beach Hotel. We have five persons, three adults and two kids, and they’d like to go to Blue Lagoon tomorrow.” This is all the info we need, this is what we call a <a href="#newtransfer">transfer</a> and this info will be the input for the application.

<br>

<h2 style="color:orange">The application</h2>

<br>
<h3 id="customers" style="color:orange">Customers</h3>
These are the companies or individuals who book a trip on behalf of their visitors. They describe the accomodation whether it's a hotel or a guest house. It can also be another travel office we co-operate with. Take note of the <a href="#activefield">active</a> field.

<br>
<br>

<h3 id="destinations" style="color:orange">Destinations</h3>
This is where we sail our visitors for their daily trip. It can be another island or a beach in the mainland. Take note of the <a href="#abbreviation">abbreviation</a> and the <a href="#activefield">active</a> fields.

<br>
<br>

<h3 id="drivers" style="color:orange">Drivers</h3>
These are the individuals who drive our visitors from their staying locations to a port. In the evening the same drivers will do the opposite and drive them back wherever they are staying. Take note of the <a href="#defaultdriver">default driver</a> and the <a href="#activefield">active</a> fields.

<br>
<br>

<h3 id="ports" style="color:orange">Ports</h3>
These are the drop-off points where our ships depart from towards a <a href="#destinations">destination</a>. Take note of the <a href="#activefield">active</a> field.

<br>
<br>

<h3 id="routes" style="color:orange">Routes</h3>
These are the designated roads our coaches drive, beginning at point A and ending at a <a href="#ports">port</a>. Along each route we have <a href="#pickuppoints">pickup points</a>. These are the equivalent of bus stops in public transport. Take note of the <a href="#abbreviation">abbreviation</a> and the <a href="#activefield">active</a> fields.

<br>
<br>

<h3 id="pickuppoints" style="color:orange">Pickup points</h3>
These are the scheduled stops along each <a href="#routes">route</a> and the driver has to stop in order to pickup our visitors. They come complete with their pickup time and an optional pair of geographic coordinates! Take note of the <a href="#activefield">active</a> field.

<br>
<br>

<h3 style="color:orange">Transfers</h3>
This is the very heart of the application and where users spend most of their time. We wanted to avoid any kind of navigation away from a single page, so this is where everything takes place on a daily basis. All the other menu options have to do with tables and are rarely touched, since they remain the same for the majority of the time.

<br>
<br>

<h4 style="color:lightgreen">How to display transfers for a particular date</h4>

* Select Transfers > Transactions
* Pick a <a href="#dates">date</a> from the datepicker
* Click the <button>Search</button> button

<h4 style="color:lightgreen">How to filter and show records for a particular customer</h4>

* Click on the customers  group title to unselect the entire group
* Click on a <a href="#customers">customer</a> to toggle the border's color
* Click the <button>Records</button> tab

<h4 id="newtransfer" style="color:lightgreen">How to add a new transfer</h4>
<ul>
    <li>Click the <button>New</button> button to display an empty <a href="#forms">form</a>.</li>
    <li>Destination</li>
    <ul>
        <li>Type <code>pa</code> and press enter</li>
        <li>Highlight the second entry with the down arrow</li>
        <li>Press enter to select it and dismiss the modal</li>
        <li>Press enter to move to the next field</li>
    </ul>
    <li>Customer</li>
    <ul>
        <li>Type <code>tu</code> and press enter.</li>
        <li>Press enter to select the first entry and dismiss the modal</li>
        <li>Press enter to move to the next field</li>
    </ul>
    <li>Pickup point</li>
    <ul>
        <li>Type <code>ariti</code> and press enter</li>
            There is only one field that matches the input so it's displayed and the next field is focused
    </ul>
    <li>Adults, Kids, Free</li>
    <ul>
    <li>Type a number on each field and press enter</li>
        <i>After each enter the total persons is calculated</i>
    <li>Click the <button>Save</button> button</li>
    </ul>
    <li>Auto populated read-only fields</li>
    <ul>
        <li>Port: Since every <a href="#routes">route</a> has a destination <a href="#ports">port</a> and every<a href="#pickuppoints"> pickup point</a> belongs to a <a href="#routes">route</a> this field is populated as soon as you select a pickup point from the list. 
        <li>Driver: The <a href="#defaultdriver">default driver</a> from the <a href="#drivers">drivers</a> table will populate this field.</li>
    </ul>
    <li>Post-save background jobs</li>
    <ul>
    <li>Once the entry is saved, calculations are made to reflect the changes. These calculations include total number of persons per customer, per destination, per route, per port and per driver.
    </li>
    <li>The form is cleared and remains visible waiting for the next record</li>
    </ul>
</ul>

<h4 style="color:lightgreen">How to assign groups of persons to drivers</h4>
    <ul>
        When no more calls are answered and our offices are about to close, it’s time to do some serious work regarding the drivers. In a nutshell, if a <a href="#routes">route</a> has a total of ninetyfive persons, which would fill two fifty seater coaches, we need two <a href="#drivers">drivers</a>. This is how we do it:
        <br>
        <ul>
            <li>Filter only the records for the "South" route</li>
            <li>From the list start checking records until we reach fifty persons</li>
            <li>Click the ‘Assign driver’ button</li>
            <li>Select a driver from a list</li>
            <li>Click the 'OK' button</li>
        </ul>
    </ul>
    The auto-refresh will reflect the changes. We repeat the process for the rest of the transfers and when done, print a report for each driver and call it a day!
<br>
<br>

<h3 style="color:orange">Period overview</h3>
    Detailed reports about how many persons we transfered in a selected period, since the beginning of the current month, the current year and comparisons with last year.



<br>
<br>

<h2 style="color:orange">Some final words</h2>
This is work in progress and new features will be added. However, at its current state, this application is serving a real travel office in Corfu since July 2020 and has replaced part of a desktop application built also by myself. It is hosted in a private network within the office and plans for the future include web hosting with controlled access and mobile version for keeping the <a href="#drivers">drivers</a> informed without the need for printouts.

<br>
<br>

<h3 style="color:orange">Notes</h3>
<br>
<ul>
    <li id="abbreviation" style="color:#ffe85c">Abbreviation</li>
        This is a short form of the description field and is used in reports in order to save space.
        <br>
        <br>
    <li id="activefield" style="color:#ffe85c">Active field</li>
        If a record is marked as active, it will be displayed as a selectable option throughout the application, usually in dropdowns. An inactive record will not be displayed. This is a way to declutter the dropdowns and display only the active items. As an example, a customer that we don't do business with anymore but its record can't be deleted, can be marked as inactive.
        <br>
        <br>
    <li id="defaultdriver" style="color:#ffe85c">Default driver</li>
        At the time of a <a href="#newtransfer">new transfer</a>, we don’t know which <a href="#drivers">driver</a> will be in charge of this group of persons. So, this field will auto populate the <a href="#drivers">driver</a> field in the <a href="#newtransfer">transfer form</a>.
        <h4 style="color:#ff9090">Important:</h4>
        <ul>
            <li>Only one default <a href="#drivers">driver</a> is allowed.</li>
            <li>If a default <a href="#drivers">driver</a> marked as <a href="#activefield">active</a> is not found, it's not possible to <a href="#newtransfer">add a new transfer</a>.</li>
        </ul>
    <li id="dates" style="color:#ffe85c">Dates</li>
        Typically, you’d select a date from the date picker. Alternatively, you can be really fast and enter a few numbers: If today is 5/6/2021 and you want to make an entry for tomorrow, type ‘6’ and press enter. The month and year will be magically added! If we are on the last day of the month, say 30/6 and you want to make an entry for the day after tomorrow, enter 2/7 and press enter. The separator you type can be anything from comma, dot or forward slash. The input, if it’s correct, will be DD/MM/YYYY formatted.
        <br>
        <br>
        <li id="forms" style="color:#ffe85c">Forms</li>
        With ease of use in mind, in every form that the user has to fill-in, navigation between the fields is done with the up and down arrow keys. The enter key can also be used to move to the next field. When the focus is on the last editable field, when the down arrow or the enter is pressed, the first editable field receives focus. My users love this functionality, which is much better than the use of tab/shift-tab to move between the fields. Removing the default functionality of the enter key from submitting the form is the best thing users can get.
</ul>
