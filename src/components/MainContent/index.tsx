import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {MainContentWrapperSC} from "./styled";
import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import {uploadImage} from "../../api/imageService";

const MainContent = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagesList, setImagesList] = useState<File[] | null>(null);

    const handleImageSelectChange = (e: SyntheticEvent) => {
        const filename = e.currentTarget.textContent;

        if (imagesList) {
            const file = imagesList.filter((image) => (image.name === filename))[0];
            setSelectedImage(file);
        }
    }

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e?.target?.files ? e?.target?.files[0] : null;

        if (file) {
            const res = await uploadImage(file);

            if (res.status === 200) {
                setImagesList([
                    ...(imagesList || []),
                    file,
                ])
            }
        }
    }

    return (
        <MainContentWrapperSC>
            <div>
                <Typography variant={'h2'}>Image upload</Typography>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        onChange={handleFileUpload}
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        hidden
                    />
                </Button>
            </div>
            <hr/>
            <div>
                <Typography variant={'h2'}>Image search</Typography>
                <Autocomplete
                    disablePortal
                    id="image-search"
                    options={imagesList || []}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    onChange={handleImageSelectChange}
                    renderInput={(params) => <TextField {...params} label="Image selector" />}
                />
            </div>
            <hr/>
            <div>
                <Typography variant={'h2'}>Selected Image</Typography>
                {selectedImage
                    ? <img src={URL.createObjectURL(selectedImage)} alt="selected" width={300} height={300}/>
                    : <Typography variant={'body2'}>Select an image</Typography>}
            </div>
        </MainContentWrapperSC>
    );
};

export default MainContent;
