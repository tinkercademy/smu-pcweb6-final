<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head >
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Twinker</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <script src="https://kit.fontawesome.com/b26b33266f.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>

        <!-- Styles -->
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">

        <style>
        </style>
    </head>
    <body>
        <div>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                <div class="container-fluid">
                    <span class="currentUser">{{$username}}</span>

                    <a class="navbar-brand logo" href="/homepage">Twinker</a>


                    <form class="form-inline" method = "post" action="/logout">
                        @csrf
                        <button class="btn btn-danger" style="font-weight: bold;" type="submit" name="logout">LOGOUT</button>
                    </form>
                </div>  
            </nav>
        </div>
        <div id="layout"></div>

        <div>
            <script src="{{mix('js/app.js')}}" ></script>
        </div>
    </body>
</html>