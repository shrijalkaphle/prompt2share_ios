import { useState } from "react"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { searchQuery } from "../../services/user.service"
import { IPost, IUser } from "../../types/models.type"
import { SearchUserCard } from "../core/SearchUserCard"
import { PostCard } from "../core/PostCard"
import Toast from "react-native-root-toast"
import { Platform } from "react-native"
import { FloatingButton } from "../core/FloatingButton"

export const SearchScreen = ({navigation}: any) => {

    const [searchText, setSearchText] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>([])
    const [posts, setPosts] = useState<IPost[]>([])

    const [searching, setSearching] = useState<boolean>(false)

    const searchUpdate = (value: string) => {
        setSearchText(value)
        search(value)
    }

    const search = async (value: string) => {
        if (value.length == 0) return
        setSearching(true)
        const response = await searchQuery(value)
        if (response && response.error) {
            Toast.show(response.message)
            setSearching(false)
            return
        }

        const { users, posts } = response
        setUsers(users)
        setPosts(posts)
        setSearching(false)
    }

    const removePost = (id: number) => {
        setPosts(posts.filter((post: IPost) => parseInt(post.id) != id))
    }

    return (
        <StyledView className="bg-background w-full h-full">
            <StyledView className="px-4">
            <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`} placeholder="Search" value={searchText} onChangeText={(e) => searchUpdate(e)} onSubmitEditing={(e) => search(e.nativeEvent.text)} autoCapitalize="none" placeholderTextColor={'white'}/>
            </StyledView>
            <StyledScrollView className="mt-4 border-t border-slate-800 p-4">
                {
                    searching
                        ?
                        <StyledActivityIndicator size={"large"} className="mt-5" />
                        :
                        <>
                            {
                                users.length != 0 &&
                                <StyledView className="w-full">
                                    <StyledText className="text-white text-xl font-bold mt-4">Users</StyledText>
                                    <StyledScrollView horizontal={true} className="py-4">
                                        {
                                            users.map((user: IUser, index) => (
                                                
                                                <SearchUserCard user={user} navigation={navigation} key={index} />
                                            ))
                                        }
                                    </StyledScrollView>
                                </StyledView>
                            }
                            {
                                posts.length != 0 &&
                                <StyledView className="w-full">
                                    <StyledText className="text-white text-xl font-bold mt-4">Posts</StyledText>
                                    <StyledScrollView className="pb-24">
                                        {
                                            posts.map((post: IPost, index) => (
                                                <PostCard key={index} post={post} navigation={navigation} removePost={removePost}/>
                                            ))
                                        }
                                    </StyledScrollView>
                                </StyledView>
                            }
                        </>

                }

            </StyledScrollView>
            <FloatingButton navigation={navigation} />
        </StyledView>
    )
}