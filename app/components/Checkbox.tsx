import Image from "next/image";

interface CheckboxProps {
    isChecked: boolean;
    setIsChecked: (checked: boolean) => void;
    warning: boolean;
}

export const Checkbox = ({isChecked, setIsChecked, warning}: CheckboxProps) => {

    return (
        <div className="relative">
            <input 
                type="checkbox" 
                className="opacity-0 absolute w-full h-full cursor-pointer" 
                name="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
            />
            <div className={`size-7.5 xl:size-8 border-2 ${warning && !isChecked ? "border-discount" : "border-checkbox"} rounded flex items-center justify-center`}>
                {isChecked && <Image src="/checkbox.svg" alt="" width={20} height={20}/>}
            </div>
        </div>
    );
}