import { useForm } from "react-hook-form"
import { object, string } from "zod"
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'


const createUserSchema = object({
  name: string({
    required_error: `name can't be empty`
  }),
  password: string({
    required_error: `password can't be empty`
  }).min(8,`password too short, should have 8 characters minimum`),
  passwordConfirmation: string({
    required_error: `password confirmation can't be empty`
  }),
  email: string({
    required_error: `email can't be empty`
  }).nonempty('email is required').email('need valid email')
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'password not match',
  path: ['passwordConfirmation']
})

const RegisterPage = () => {

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm({
    resolver: zodResolver(createUserSchema)
  })

  const onSubmit = (values: any) => {
    console.log(values)
  }

  console.log(errors)

  return (
    <div className="flex justify-center md:py-12">
      <div className="md:w-96 md:border border-black border-opacity-10 md:shadow-lg md:rounded-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)} 
        >
          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="text-gray-700">Name</label>
              <input
                className="w-full p-2 border border-gray-500 border-opacity-20 rounded-md"
                type="text"
                placeholder="John Doe"
                {...register('name')}
              />
              <small className="text-red-500">{errors.name?.message}</small>
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-gray-700">Email</label>
              <input
                className="w-full p-2 border border-gray-500 border-opacity-20 rounded-md"
                type="text"
                placeholder="johndoe@gmail.com"
                {...register('email')}
              />
              <small className="text-red-500">{errors.email?.message}</small>
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                className="w-full p-2 border border-gray-500 border-opacity-20 rounded-md"
                type="password"
                placeholder="password"
                {...register('password')}
              />
              <small className="text-red-500">{errors.password?.message}</small>
            </div>
            <div className="space-y-1">
              <label htmlFor="passwordConfirmation" className="text-gray-700">Password Confirmation</label>
              <input
                className="w-full p-2 border border-gray-500 border-opacity-20 rounded-md"
                type="password"
                placeholder="password confirmation"
                {...register('passwordConfirmation')}
              />
              <small className="text-red-500">{errors.passwordConfirmation?.message}</small>
            </div>
            <button
              className="w-full bg-blue-500 py-1.5 text-white rounded-md"
              type='submit' 
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage