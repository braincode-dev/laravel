public function update(Request $request){

        $this->validate($request,[
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'image' => 'max:3000|mimes:jpeg,jpg,png',
        ]);

        $file = Input::file('image');
        $user = User::query()->find($request->id);
        if ($file) {

            $old_img = $user->avatar_path;
            if(File::exists(public_path($old_img))) {
                File::delete(public_path($old_img));
            }

            $file_path = '/uploads/profile/';
            $img_name = $file->store('');
            $path_image = $file_path.$img_name;
            $file->move(public_path($file_path), $img_name);

        } else {
            $path_image = $user->avatar_path;
        }


        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->isAdmin = '1';
//        $user->password = bcrypt($request->password);
        $user->avatar_path = $path_image;

        $user->save();
        return redirect(route('admins.all'))->with('message', 'Адміністратор відредагований');
    }
