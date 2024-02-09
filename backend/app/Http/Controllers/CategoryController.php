<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use Str;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use App\Http\Requests\StoreCategoryRequest;

use App\Http\Requests\UpdateCategoryRequest;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $categories = (new Category())->getAllCategory($request);
        return CategoryListResource::collection($categories);
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
    public function store(StoreCategoryRequest $request)
    {
        //
        $category = $request->except('photo');
        $category['slug'] = Str::slug($request->input('slug'));
        $category['user_id'] = auth()->id();

        if ($request->has('photo')) {
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Category::IMG_URL_PATH;
            $path_thumb = Category::THUMB_IMG_URL_PATH;
            $category['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        (new Category())->storeCategory($category);
        return response()->json(['msg' => 'Category Created Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
        // return $category;
        return new CategoryEditResource($category);

        // return CategoryEditResource::collection($category);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {

        $category_data = $request->except('photo', 'created_at');
        $category_data['slug'] = Str::slug($request->input('slug'));

        if ($request->has('photo')) {
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Category::IMG_URL_PATH;
            $path_thumb = Category::THUMB_IMG_URL_PATH;
            $category_data['photo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width, $height, $path_thumb, $file);
        }
        $category->update($category_data);
        return json_encode($category);
        return response()->json(['msg' => 'Category Updated Successfully.', 'cls' => 'sucess']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();
        return response()->json(['msg' => 'Category deleted Successfully.']);
    }
    public function getCategory()
    {
        $category = (new Category)->getCategoryIdAndName();
        return response()->json($category);

    }
}
