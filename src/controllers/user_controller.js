import asyncHandler from "../utils/asyncHandler.js"
import ApiError from '../utils/ApiError.js'
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {

    // algorithm for the registration..
    // 1. get user details from frontend..
    // 2. validation - not empty..
    // 3. check if user already exists: username, email..
    // 4. check for images and avatar..
    // 5. upload them to cloudinary, avatar..
    // 6. create user object - create entry in database..
    // 7. remove password and refresh token field from response..
    // 8. check for user creation..
    // 9. return response..




    // 1. Get user details from frontend
    const { fullName, email, userName, password } = req.body

    // 2. Validation - check if fields are empty
    if ([fullName, email, userName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.")
    }

    // 3. Check if user already exists
    const checkingExistedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if (checkingExistedUser) {
        throw new ApiError(409, "User already existed.");
    }

    // 4. Check for images
    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avtarLocalPath) {
        throw new ApiError(400, "Avatar field is required.")
    }
    console.log("file", req.files);
    console.log("body", req.body);

    // 5. Upload to Cloudinary
    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar field is required.")
    }

    // 6. Create user and entry in database
    const user = await User.create({
        fullName,
        email,
        password,
        userName: userName.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    // removing the password field and refresh token field..
    const createdUser = await User.findById(user._id).select(
        " -password -refreshToken "
    )

    // check for user creation..
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering a user.")
    }

     // Return response
     return res.status(201).json({
        message: "User registered successfully.",
        user: createdUser
    });

    return

})

export { registerUser }