# UX improved Ng Data Tables: 

You can access live [DEMO here](https://alexandrursu.github.io/ng-data-table/):

# My thoughts:
In order to generate an efficient design solution I decided to start from understanding what is the user even trying to do on a table? I eventually concluded that there are 3 core user goals with tables:

1. To browse easy lots of info at once.
   Solution:
   * Added fixed header. Fixing the row header as a user scrolls provides context on what column the user is on.
   * Implemented search for Routes Tables as they can have hundreds of pages. 
   * Enabled pagination for Routes Tables, it will let us split a huge amount of content within the tables into smaller chunks and keep fixed table height. 
   * All tables are sortable.
2. To determine and execute actions quickly, e.g. editing, removing, adding new rows.
   * Made add action more visible and implemented 'Add New Row' button on each table which allows the user to add data without navigating to a separate modal view. I found modal action very confusing.
   * Added 'Inline Editing' button which allows us edit already existing data. That helps us save more user actions, from presvious screen user had to delete then add new one to achieve the same result. (OPTIONAL: would be nice to have 'on-row-click' edit, I didn't have time to implement this, but it is feasible)
   * Remove action is the same.
    
3. To have clean, consistent and modularized design.
   * All the tables are in a separate section but still aligned in Dig and Mag columns.
   * Used company logo colors for appling gradient to the tables headers, which helps clearly distincs content from headers.
   * All the paddings kept consistent.
   * All the tables are configuarable and reusable.
   * All the styles use flexbox (we can add breakpoint to have them wrap let's say on tablet view)


# NgDataTable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
