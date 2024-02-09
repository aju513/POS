<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;
use App\Manager\ImageManager;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $subcategory = (new SubCategory)->getCategory($request);

        return SubCategoryListResource::collection($subcategory);
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
    public function store(StoreSubCategoryRequest $request)
    {
        //
        $subcategory = $request->except('photo');
        $subcategory['slug'] = Str::slug($request->input('slug'));
        $subcategory['user_id'] = auth()->id();

        if ($request->has('photo')) {
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = SubCategory::IMG_URL_PATH;
            $path_thumb = SubCategory::THUMB_IMG_URL_PATH;
            $subcategory['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        (new SubCategory())->storeCategory($subcategory);
        return response()->json(['msg' => 'Sub Category Created Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        // return $subCategory;
        return new SubCategoryEditResource($subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        //
        $category_data = $request->except('photo', 'created_at');
        $category_data['slug'] = Str::slug($request->input('slug'));
        $category_data['status'] = 'Active' == $request['status'] ? 1 : 0;
        $url = filter_var($request['photo'], FILTER_SANITIZE_URL);

        // Validate url
        if (filter_var($url, FILTER_VALIDATE_URL) === false) {

            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = SubCategory::IMG_URL_PATH;
            $path_thumb = SubCategory::THUMB_IMG_URL_PATH;
            $category_data['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width, $height, $path_thumb, $file);
        }

        $subCategory->update($category_data);
        return json_encode($subCategory);
        return response()->json(['msg' => 'Category Updated Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        //
        $subCategory->delete();
    }
}
