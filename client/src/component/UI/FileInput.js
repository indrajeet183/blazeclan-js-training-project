const FileInput = (props) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
            </div>
            <div className="custom-file">
                <input type="file" className="custom-file-input" multiple id="inputGroupFile01"
                    onChange={(e) => { props.handleChange(e.target.files) }} />
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            </div>
        </div>
    )
}

export default FileInput