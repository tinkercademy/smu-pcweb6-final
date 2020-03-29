<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Login</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <script src="https://kit.fontawesome.com/b26b33266f.js" crossorigin="anonymous"></script>

        <!-- Styles -->
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        <style>
            html, body {
                background-color: #34b7eb;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
        </style>
        
    </head>
    <body>
        <div class="flex-center position-ref full-height">

            <div class="content">
                <div class="title m-b-md">
                    TWINKER
                </div>
                <form method="POST" action="/homepage">

                    @csrf

                    <div class="loginfield">
                        <span style="font-size: 20px; color: white;">
                            <i class="fas fa-user"></i>
                        </span>
                        <input class="loginbox" type="text" placeholder="Your Username" name = "username" required>
                    </div>

                    <div class = "loginfield">
                        <span style="font-size: 20px; color: white;">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input class="loginbox" type="password" placeholder="Your Password" name = "password" required>
                    </div>

                    <div class = "loginfield">
                        <input type="submit" id="loginbtn" value="Login" name="login">
                    </div>
                    <div class = "loginfield">
                        <span style="font-size:20px">Don't have an account?</span>
                        <br>
                        <input type="button" id="regbtn" value="Register" onclick= "window.location.href = 'register'">
                    </div>
                </form>
            </div>
        </div>

    </body>
</html>
