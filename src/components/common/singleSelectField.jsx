import React from 'react';
import Select from 'react-select';

const SingleSelectField = ({options, ...customProps}) => {           
    const componentProps = {        
        className: "basic-single",
        classNamePrefix: "select",
        defaultValue: {undefined},
        isDisabled: false,
        isLoading: false,
        isClearable: true,
        isRtl: false,
        isSearchable: true,
        name: "color",
        ...customProps
    };    

    const filterOptions = (candidate, input) => {
        if (!input) return true;        
        return (candidate.label.toLowerCase().includes(input.toLowerCase()));        
    };

    console.log(options.length)

    return (        
         <Select            
            options={options}
            onChange={(data) => console.log('select changed', data)}
            filterOption={filterOptions}
            {...componentProps}
        />        
    );
}
 
export default SingleSelectField;



// export default class SingleSelect extends Component<{}, State> {
//   const state = {
//     isClearable: true,
//     isDisabled: false,
//     isLoading: false,
//     isRtl: false,
//     isSearchable: true,
//   };

//   toggleClearable = () =>
//     this.setState((state) => ({ isClearable: !state.isClearable }));
//   toggleDisabled = () =>
//     this.setState((state) => ({ isDisabled: !state.isDisabled }));
//   toggleLoading = () =>
//     this.setState((state) => ({ isLoading: !state.isLoading }));
//   toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
//   toggleSearchable = () =>
//     this.setState((state) => ({ isSearchable: !state.isSearchable }));

//   render() {
//     const {
//       toggleClearable,
//       toggleDisabled,
//       toggleLoading,
//       toggleRtl,
//       toggleSearchable,
//     } = this;

//     const { isClearable, isSearchable, isDisabled, isLoading, isRtl } =
//       this.state;

//     return (
//       <Fragment>
//         <Select
//           className="basic-single"
//           classNamePrefix="select"
//           defaultValue={colourOptions[0]}
//           isDisabled={isDisabled}
//           isLoading={isLoading}
//           isClearable={isClearable}
//           isRtl={isRtl}
//           isSearchable={isSearchable}
//           name="color"
//           options={colourOptions}
//         />

//         {/* <div
//           style={{
//             color: 'hsl(0, 0%, 40%)',
//             display: 'inline-block',
//             fontSize: 12,
//             fontStyle: 'italic',
//             marginTop: '1em',
//           }}
//         >
//           <Checkbox checked={isClearable} onChange={toggleClearable}>
//             Clearable
//           </Checkbox>
//           <Checkbox checked={isSearchable} onChange={toggleSearchable}>
//             Searchable
//           </Checkbox>
//           <Checkbox checked={isDisabled} onChange={toggleDisabled}>
//             Disabled
//           </Checkbox>
//           <Checkbox checked={isLoading} onChange={toggleLoading}>
//             Loading
//           </Checkbox>
//           <Checkbox checked={isRtl} onChange={toggleRtl}>
//             RTL
//           </Checkbox>
//         </div> */}
//       </Fragment>
//     );
//   }
// }