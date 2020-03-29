<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\userinfo;
use Session;

class UserinfoController extends Controller
{
    public function store()
    {
    	$userinfo = new userinfo();

    	$userinfo->username = request('username');
    	$userinfo->password = request('password');
    	$userTaken = userinfo::where('username', request('username'))->first();

    	if ($userTaken != null){
    		echo "<script type = 'text/javascript'> alert('Username taken!')</script>";
    		return view('register');
    	}else{
	    	if (request('password') == request('cpassword')){
	    		$userinfo->save();
	    		echo "<script type = 'text/javascript'> window.location.href='/';alert('Account created!');</script>";
	    	}else{
	    		echo "<script type = 'text/javascript'> alert('Passwords do not match!')</script>";
	    		return view('register');
	    	}
    	}

    }

    public function show(Request $request)
    {
    	$userMatched = userinfo::where('username', request('username'))->where('password', request('password'))->first();



    	if($userMatched != null){
            session(['username' => request('username')]);
            $data = session('username');
    		return view('homepage', [
                'username' => $data
            ]);
    	}else{
            echo "<script> window.location.href='/';alert('Username or password incorrect!');</script>";
        }

    }

    public function destroy(Request $request)
    {
        session()->forget('username');
        session()->forget('tweetID');
        return redirect('/');
    }

    public function redirect(Request $request)
    {
        $data = session('username');

        if($data != null){
            return view('homepage', [
                'username' => $data
            ]);
        }else{
            return redirect('/');
        }
    }

    public function index(){
        return session('username');
    }
}
