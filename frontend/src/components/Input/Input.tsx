import { forwardRef } from "react"

interface  Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export const  Input = forwardRef<HTMLInputElement, Props>(
    ({placeholder, ...rest}: Props, ref) => {

        return (

            <input 
                ref={ref}
                type="text"
                placeholder={placeholder}
                className="outline-none shadow-lg border-gray-100 rounded-lg w-full p-3 mt-3 my-2"
                {...rest}
            />

        );
    })