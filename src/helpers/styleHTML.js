const html =(token) => { return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  .wrapper{
    height: 200px;
    width: 400px;
    background-color: red;
    border: 2px solid yellow;
    margin-left: auto;
    margin-right: auto;
    border-radius: 40px;
    text-align: center;
    line-height: 200px;
  }
</style>
</head>

<body>
  <div class="wrapper">
    klik here <a href="https://google.com/verifikas?code=${token}"> disini</a>
  </div>
</body>
</html>`
}
module.exports = html