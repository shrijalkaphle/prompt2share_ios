import { Formik } from "formik"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"
import { InputField } from "../core/InputField"
import * as Yup from 'yup'
import { FORM_ERRORS } from "../../enum/form.enum"
import AutoGrowingTextInput from "react-native-autogrow-textinput-ts"
import { Button } from "react-native"
import { createManualTextPost } from "../../services/post.service"
import Toast from "react-native-root-toast"

interface ITextPost {
    prompt: string
    chunk: string
}

export const TextPost = ({navigation} : any) => {

    const initialFormikValue = {
        prompt: '',
        chunk: ''
    }

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required(FORM_ERRORS.REQUIRED),
        chunk: Yup.string().required(FORM_ERRORS.REQUIRED),
    })

    const [initialValue, setInitialValue] = useState<ITextPost>(initialFormikValue)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    const postToFeed = async (value: ITextPost) => {
        const response = await createManualTextPost(value)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setFormLoading(false)
            return
        }

        Toast.show('Post created')
        navigation.navigate('Home', { screen: 'Profile' })
        setFormLoading(false)
    }

    return (
        <>

            <Formik initialValues={initialValue} onSubmit={postToFeed} validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <StyledView >
                        <StyledView className="w-full flex flex-row items-center justify-between">
                            <StyledText className="text-white text-2xl font-bold mb-2">Create a post</StyledText>
                            <StyledTouchableOpacity className="w-fit px-4 py-2 rounded-full flex items-center justify-center border-slate-300 border" disabled={formLoading} onPress={() => handleSubmit()}>
                                {
                                    formLoading ? <StyledActivityIndicator /> : <StyledText className="text-white text-lg">Post</StyledText>
                                }
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="mt-3">
                            <InputField
                                value={values.prompt}
                                handleChange={handleChange('prompt')}
                                handleBlur={handleBlur('prompt')}
                                placeholder="Enter your prompt"
                                error={`${errors.prompt && touched.prompt ? errors.prompt : ""}`}
                                secureText={false}
                            />
                        </StyledView>
                        <StyledView className={`w-full rounded-xl ${errors.chunk && touched.chunk ? 'bg-red-200' : 'bg-white/10'} h-fit p-4`}>
                            <AutoGrowingTextInput placeholder={'Write a post'} style={{ color: 'white', textAlignVertical: 'top' }}
                                minHeight={50} maxHeight={50} placeholderTextColor={errors.chunk && touched.chunk ? 'red' : 'white'} value={values.chunk}
                                onChangeText={handleChange('chunk')} onBlur={handleBlur('chunk')} />
                        </StyledView>
                        <StyledText className="text-red-500 text-xs ml-2">{errors.chunk && touched.chunk ? errors.chunk : ''}</StyledText>
                    </StyledView>
                )}
            </Formik>
            {/* <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4">
                <StyledTextInput className="text-white" placeholder={'Your Prompt'} placeholderTextColor={'white'} value={prompt} onChange={(e) => setPrompt(e.nativeEvent.text)} returnKeyType="done" />
            </StyledView> */}
        </>
    )
}