import React from 'react';
import { useState } from 'react';

const CONTROLS_TEST_STYLE = 'text-primary';

const SortDropdown = ({options, defaultOption, onChange}) => {
    const [activeOption, setActiveOption] = useState(defaultOption || options[0]);    

    return (
        <div className="btn-group m-2">
                <button 
                    className={"btn "+CONTROLS_TEST_STYLE+" btn-sm dropdown-toggle"}
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseTags" 
                    aria-expanded="false" 
                    aria-controls="collapseTags"
                >
                    Фильтр
                </button>

                <div className="dropdown ms-1">
                    <button 
                        className={"btn "+CONTROLS_TEST_STYLE+" btn-sm dropdown-toggle"} 
                        type="button" 
                        id="dropdownMenuButton1" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Сортировка
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                        {
                            options.map(opt => (
                                <li key={opt.value}>
                                    <button className={"dropdown-item" + (opt.value === activeOption.value ? ' active' : '')}>{opt.title}</button>
                                </li>        
                            ))
                        }                        
                    </ul>
                </div>
            </div>
    );
}
 
export default SortDropdown;