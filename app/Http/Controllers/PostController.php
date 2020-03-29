<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function store(Request $res)
    {
        $tweet = new Post();

    	$tweet->entry = $res->entry;
        $tweet->username = session('username');

    	$store = $tweet->save();

    	if($store){
    		return Post::orderBy('postedAt', 'DESC')->get();
    	}
    }

    public function index()
    {
        $data = session('username');

        if($data != null){
            return Post::latest('postedAt')->get();
        }else{
            return redirect('/');
        }  	
    }

    public function delete(Request $res)
    {
        if(session('username') == $res->username){
            $delete = Post::where('id', $res->id)->delete();
            Post::where('parentTweetId', $res->id)->delete();
            if($delete){
                return Post::orderBy('postedAt', 'DESC')->get();
            }
        }else{
            return Post::orderBy('postedAt', 'DESC')->get();
        }
    }

    public function deletereply(Request $res)
    {

        if(session('username') == $res->username){
            $delete = Post::where('id', $res->id)->delete();
            if($delete){
                $parentTweet = Post::find($res->parentID);
                $parentTweet->numberOfReplies -= 1;
                $parentTweet->save();
                return Post::where('parentTweetId', $res->parentID)->get();
            }
        }else{
            return Post::where('parentTweetId', $res->parentID)->get();
        }
    }

    public function update(Request $res)
    {
        if(session('username') == $res->username){
            $data = Post::find($res->id);
            $data->entry = $res->entry;
            $updated = $data->save();

            if($updated){
                return Post::orderBy('postedAt', 'DESC')->get();
            }
        }else{
            return Post::orderBy('postedAt', 'DESC')->get();
        }
    }

    public function updatePT(Request $res)
    {
        if(session('username') == $res->username){
            $data = Post::find($res->id);
            $data->entry = $res->entry;
            $updated = $data->save();

            if($updated){
                return Post::find($res->id);
            }
        }else{
            return Post::find($res->id);
        }
    }

    public function updateReply(Request $res)
    {
        if(session('username') == $res->username){
            $data = Post::find($res->id);
            $data->entry = $res->entry;
            $updated = $data->save();

            if($updated){
                return Post::where('parentTweetId', $res->parentID)->get();
            }
        }else{
            return Post::where('parentTweetId', $res->parentID)->get();
        }
    }

    public function reply(Request $res)
    {

        $reply = new Post();

        $reply->entry = $res->entry;
        $reply->username = session('username');
        $reply->parentTweetId = $res->id;
        $reply->isReply = 1;

        $store = $reply->save();

        if($store){
            $parentTweet = Post::find($res->id);
            $parentTweet->numberOfReplies += 1;
            $parentTweet->save();
            return Post::orderBy('postedAt', 'DESC')->get();
        }
    }

    public function replyParent(Request $res)
    {

        $reply = new Post();

        $reply->entry = $res->entry;
        $reply->username = session('username');
        $reply->parentTweetId = $res->id;
        $reply->isReply = 1;

        $store = $reply->save();

        if($store){
            $parentTweet = Post::find($res->id);
            $parentTweet->numberOfReplies += 1;
            $parentTweet->save();
            return Post::where('parentTweetId', $res->id)->get();
        }
    }

    public function view(Request $res){
        return Post::find($res->id);
    }

    public function display(Request $res)
    {
        return Post::where('parentTweetId', $res->id)->get();
    }

    public function specific($id)
    {
        $data = session('username');

        if($data != null){
            session(['tweetID' => $id]);
            return view('replies', [
                'username' => session('username')
            ]);
        }else{
            return redirect('/');
        }
        
    }

    public function loadparenttweet()
    {
        return Post::where('id', session('tweetID'))->get();
    }

    public function loadreplies()
    {
        return Post::where('ParentTweetId', session('tweetID'))->get();
    }

    public function search(Request $res)
    {
        $results = Post::where('entry', 'LIKE', '%' . $res->data . '%')
                    ->orWhere('username', 'LIKE', '%' . $res->data . '%')
                    ->orderBy('postedAt', 'desc')
                    ->get();
        if(count($results) > 0){
            return $results;
        }else{
            return Post::where('entry', "")->get();
        }
    }
}