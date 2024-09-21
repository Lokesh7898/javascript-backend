import asyncHandler from "../utils/asyncHandler.js"
import ApiError from '../utils/ApiError.js'
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 

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




    // validating the user registration that all fields are required..
    const { fullName, email, userName, password } = req.body
    console.log("email: ", email);
    if( [fullName, email, userName, password].some((field) => field?.trim() === "" ) ){
        throw new ApiError(400, "All fields are required.")
    }

    // checking if user is already exist..
    const checkingExistedUser = User.findOne({
        $or: [ { userName }, { email } ]
    })
    if(checkingExistedUser){
        throw new Error(409 ,"User already existed.");
    }

    // uploading  files to the localdisk and validation..
    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (avtarLocalPath) {
        throw new ApiError(400, "Avtar field is required.")
    }

    // uploading files from local disk to cloudinary..
    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "avatar field is required.")
    }

    // create user and entry in database..
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

    return 

})

export { registerUser }