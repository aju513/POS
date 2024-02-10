<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandListResource;
use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $brands = (new Brand())->getAllBrand($request);
        return BrandListResource::collection($brands);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        //
        $brand = $request->except('photo');
        $brand['slug'] = Str::slug($request->input('slug'));
        $brand['user_id'] = auth()->id();

        if ($request->has('photo')) {
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Brand::IMG_URL_PATH;
            $path_thumb = Brand::THUMB_IMG_URL_PATH;
            $brand['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }

        (new Brand())->storeBrand($brand);
        return response()->json(['msg' => 'Brand Created Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandEditResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        //
        $brand_data = $request->except('photo', 'created_at');
        $brand_data['slug'] = Str::slug($request->input('slug'));

        $url = filter_var($request['photo'], FILTER_SANITIZE_URL);

        // Validate url
        if (filter_var($url, FILTER_VALIDATE_URL) === false) {
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $width_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Brand::IMG_URL_PATH;
            $path_thumb = Brand::THUMB_IMG_URL_PATH;
            $brand_data['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $width_thumb, $path_thumb, $file);
        }
        $brand->update($brand_data);
        return json_encode($brand);
        return response()->json(['msg' => 'Brand Updated Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
