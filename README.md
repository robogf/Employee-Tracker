# Employee-Tracker

## Deployed Link 
![site](https://watch.screencastify.com/v/eq6KjpddKpPQtZ2884c6)

## Example Picture 
![site](/Screenshot%202022-11-01%20at%2010.20.52%20PM.png)

## Techonologies Used 
- Inquirer - Used this package to start our inquierer prompt on our terminal, this allowed us to view the questions and select our answers.
- MYSQL- This technology allowed us to create databases with information logged into which we then modified correctly.

## Summary 
In this application we were able to create the database of a company, allowing us to view employees, their id, role in the company, and their managers, as well as their salaries.

## Code Snippet 
``` JavaScript 
.then(function(answer){
        const params = [answer.newFirst, answer.newLast]
        const rolSql = 'SELECT roles.id, role_title FROM roles;'
        db.query(rolSql, (err,data) => {
            if (err) throw err;
``` 
## Author Links

[LinkedIn](https://www.linkedin.com/in/angel-matias-01120b251/)
[GitHub] (https://github.com/robogf)
