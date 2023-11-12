const Input = ({name, value, label, onChange}) => {
  return ( 
    <div className="mb-3">
    <label htmlFor="email">{label}</label>
    <input onChange={onChange} 
    value={value} 
    type="text"
     id={name} 
     name={name} 
     className='form-control'/>
</div>
   );
}
 
export default Input;