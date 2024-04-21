import { useData } from '../contexts/DataContext';

const ImagePathInput: React.FC = () => {
    const { imagePath, setImagePath } = useData();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setImagePath(value);
    };

    return (
        <input
            type="text"
            value={imagePath}
            onChange={handleChange}
            placeholder="Enter image path"
        />
    );
};

export default ImagePathInput;