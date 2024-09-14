import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


//*****************************Generate Access And Refresh Token ****************************************** */



const generateAccessAndRefreshTokens = async(userId) =>{
  try {
      //generate access token
      //generate refresh token
      //return access and refresh tokens
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})

      return {accessToken, refreshToken}
      
  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating Access and Refresh Tokens")
  }
}

//****************************************************************************************************************** */




//**********************************Registeration of Student*******************************************************

 const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } =
    req.body;

    console.log(req.body)
  if([name, email, password].some((field) =>
         field?.trim() === "")){
    throw new ApiError(400, "All fields are required")
}

  
const existedUser = await User.findOne({email})

if(existedUser){
    throw new ApiError(409, "User with email already exists")
}


  const student = await User.create({
    name,
    email,
    password,
    role: "student",
  })

  const createdUser = await User.findById(student._id).select("-password -refreshToken")
  if(!createdUser){
    throw new ApiError(500, "Something went wrong registering the Student")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "Student registered successfully")
)
  
});

//*************************************************************************************************************




//********************************************Register an instructor***************************************************** 

const registerInstructor = asyncHandler(async (req, res) => {
       
      const {
        name,
        email,
        password
      } = req.body;

    //   console.log(firstName,
    //     lastName,
    //     username,
    //     email,
    //     phone,
    //     nic,
    //     dob,
    //     gender,
    //     password,
    //     doctorDepartment)

      if([name,
        email,
        password
      ].some((field) =>
        field?.trim() === "")){
   throw new ApiError(400, "All fields are required")
}

      const existedUser = await User.findOne(
        { email }
      )

      if(existedUser){
        throw new ApiError(409, "User with email already exists")
      }


 


    const instructor = await User.create({
        name,
        email,
        password,
        role: "instructor",
      })

      const createdUser = await User.findById(instructor._id).select("-password -refreshToken")
      if(!createdUser){
        throw new ApiError(500, "Something went wrong registering the instructor")
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser, "Instructor registered successfully")
      )
     
    });

    //*****************************************************************************************************





//********************************************Register Admin*******************************************************

 const registerAdmin = asyncHandler(async (req, res) => {
  const { name,
          email,
          password
    } =
    req.body;

    if([name,
        email,
        password
      ].some((field) =>
        field?.trim() === "")){
   throw new ApiError(400, "All fields are required")
}
  

const existedUser = await User.findOne(
    { email }
  )

  if(existedUser){
    throw new ApiError(409, "User with email already exists")
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: "admin",
  })

  const createdUser = await User.findById(admin._id).select("-password -refreshToken")
  if(!createdUser){
    throw new ApiError(500, "Something went wrong registering the Admin")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "Admin registered successfully")
  )

});

//********************************************************************************************************************






//******************************************************User Login **************************************** */

 const login = asyncHandler(async (req, res) => {

  const { 
    email, 
    password, 
    confirmPassword, 
    role 
} = req.body;

// console.log(email, password, username, confirmPassword, role)
  if([
    email , 
    password, 
    confirmPassword, 
    role].some((field) =>
    field?.trim() === "")){
throw new ApiError(400, "All fields are required")
}
  
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password not matched with confirm password")
  }
  const user = await User.findOne({email})

// console.log(user)

if(!user){
  throw new ApiError(404, "User does not exist")
}

const isPasswordValid = await user.generateAuthToken(password)

if(!isPasswordValid){
  throw new ApiError(401, "Invalid credentials")
}

const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

if(!loggedInUser){
  throw new ApiError(500, "Something went wrong while logging in")
}

const options = {
  httpOnly: true,
  secure: false
}

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
  new ApiResponse(200,
    {
      user: loggedInUser,accessToken,refreshToken
    }
    , "Logged in successfully")
)
 
});

//********************************************************************************************************************



//**************************************************Get user details************************************************* */

//  const getUserDetails = asyncHandler(async (req, res) => {
//   const user = req.user;
//   console.log(user)
//   return res
//   .status(200)
//   .json(
//     new ApiResponse(200,user,"User fetched successfully")
//   );
// });

//***************************************************************************************************************** */




//**************************************************LogOut User************************************************* */

const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user.id,
    {
      $set:{
        refreshToken: undefined
      }  
    },
    {
      new : true
    }
  )

  const options = {
    httpOnly: true,
    secure : false
}

  return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, "User logged out successfully"))
})

//*************************************************************************************************************** */















export { registerAdmin, registerStudent, registerInstructor,  logoutUser, login };