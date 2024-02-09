<?php
namespace App\Manager;

use App\Models\Category;
use Image;

class ImageManager
{

    public static function uploadImageManager(string $name, int $width, int $height, string $path, string $file)
    {

        $image = Image::make($file)->fit($width, $height);
        // Determine original image format
        $original_mime = $image->mime();
        $original_extension = explode('/', $original_mime)[1];
        $image_file_name = $name . '.' . $original_extension;
        $image->encode($original_extension, 50);
        $image->save(public_path($path) . $image_file_name);

        return $image_file_name;
    }

    public static function deletePhoto($path, $img): void
    {
        $path = public_path($path) . $img;
        if ($img != '' && file_exists($path)) {
            unlink($path);
        }
    }


}
?>