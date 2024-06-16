import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrefDropdown = ({ label, options, placeholder }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-auto">
            <p className="py-3 text-sm md:text-base text-black font-normal">{label}</p>
            <div
                className="select select-md rounded-md select-bordered focus:border-2 focus:outline-0 text-base flex items-center w-full"
                ref={buttonRef}
                onClick={toggleDropdown}
            >
                {placeholder}
            </div>
            {dropdownOpen && (
                <div ref={dropdownRef} className="absolute z-10 bg-white rounded-md shadow-[0_4px_10px_2px_rgb(0,0,0,0.25)] w-80 h-28 overflow-y-auto mt-1">
                    <ul className="h-auto p-2">
                        {options.map((option, index) => (
                            <li className="mb-1" key={index}>
                                <div className="flex items-center p-2 rounded-md hover:bg-gray-200">
                                    <input type="checkbox" className="w-4 h-4 bg-white" />
                                    <label className="w-full ml-2 text-base font-normal text-black rounded-md">{option}</label>
                                </div>
                            </li>
                        ))}
                        <Link>
                            <button className="btn btn-sm text-center text-base font-normal text-white border-0 bg-dark-green hover:bg-accent-green mt-2 h-10 w-full">
                                Seleccionar
                            </button>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PrefDropdown;
