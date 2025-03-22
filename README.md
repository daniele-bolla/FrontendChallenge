## Possible imprvements
I haven't been using Angular for a while and was a bit rusty at first. However, I soon rediscovered the potential of working with this framework and how much I love its clean structure and using RxJS.

The current state of the app is basic but can be eventually improved. 
I have been using Day.js as my choice for implementing the countdown. However, I discovered that it is not a primary choice for dealing with Angular Material and would be good to replace it with another library like date-fns, which has Material adapters. Another option is to create a custom adapter or use some Day.js adapter from other users on npm, although they are not officially supported.

The timezone is set to London, and it would be ideal to match the user local as well.

The input date has been disabled to avoid issues but that could be solved in cleaner way.

Another improvement would be to be able to switch between different storage options like localStorage, sessionStorage, or an in-memory database.
I didn't focus on accessibility, and there is room for improvement in responsiveness.
Error handling has not been implemented, though it is always an essential feature.
The CSS is simple and aims to follow the BEM system, but the design is not always adhered to rigorously from Figma.

I also didn't customize the Material inputs.
## Running the app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. 

## Hosted version 
The app is running n gh pages [https://daniele-bolla.github.io/FrontendChallenge/](https://daniele-bolla.github.io/FrontendChallenge/)
