### Project Details

Programming Language: PHP
Framework: Laravel
Additional Code Information: Blade PHP, Vanilla Asynchronous JavaScript AJAX

### Command and Context

Please do implement, fix, and do the following

- Preserve old code comments.
- Implement a role based middleware. `User` can only see the Welcome page and nothing else. `Admin` has full access
- When implementing the role based middleware, conditionally render and exclude the menu that the user doesn't forbidden to access on the sidebar.

### Expected Output

Expected edited files (this is NOT the required limit of which files can be edited, it is possible and you may add more files when needed, but if there is no change exclude them):

- resources/views/layouts/partials/sidebar.blade.php
- app/Http/Middleware/UserRoleMiddleware.php
- routes/web.php
- routes/api.php

### Additional Reference

- https://laravel.com/docs/12.x/installation
- https://laravel.com/docs/12.x/configuration