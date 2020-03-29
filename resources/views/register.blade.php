<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Register</title>

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
        <div class="flex-center position-ref">

            <div class="content">
                <div class="title m-b-md">
                    TWINKER
                </div>

                <form method="POST" class="loginbox" action="/register">

                    @csrf

                    <div class = "loginfield">
                        <span style="font-size: 20px; color: white;">
                            <i class="fas fa-user"></i>
                        </span>                     
                        <input type="text" placeholder="Your Username" name="username" required>
                    </div>

                    <div class = "loginfield">
                        <span style="font-size: 20px; color: white;">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" placeholder="Your Password" name="password" required>
                    </div>

                    <div class = "loginfield">
                        <span style="font-size: 20px; color: white;">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" placeholder="Confirm Password" name="cpassword" required>
                    </div>
                    
                    <div>
                        <input type="submit" id="regbtn" value="Register Account" name="reg_btn">
                        <br>
                        <input type="button" id="backbtn" value="Back to Login Page" onclick="window.location.href='/'">
                    </div>
                </form>
            </div>
        </div>

    </body>
</html>
