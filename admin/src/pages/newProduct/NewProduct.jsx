import "./newproduct.css";
import {useState} from "react"
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }


  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  const handleClick= (e) => {
    e.preventDefault()
    const filename = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
            console.log("default");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, img: downloadURL, categories: cat};
          addProduct(product, dispatch)
          navigate("/products")
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title </label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description </label>
          <input type="text" name="desc" placeholder="Product description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price </label>
          <input type="number" name="price" placeholder="12" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories </label>
          <input type="text"  placeholder="Jeans, Skirt..." onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick}className="addProductButton">Create</button>
      </form>
    </div>
  );
}