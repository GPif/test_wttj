# README

## Install

To run the application on dev mode :

*   Have a running Redis on localhost port 6379
*   Have foreman (`gem install foreman`)
*   Run `foreman start -f Procfile.dev -p 3000`

## Improvements

*   add tests
*   improve drag and drop :
    *   Keep element with the cursor while moving
    *   Give the possibily to reorder among column
*   Set dashboard id as a parameter for the websocket connection
