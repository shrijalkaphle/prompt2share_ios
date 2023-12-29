export enum ENDPOINT {
    LOGIN = "auth/login",
    REGISTER = "auth/register",
    VERIFY_REGISTER = "auth/verify-register",
    ME = "auth/me",
    BILLING = "me/billing",
    NOTIFICATIONS = "me/notifications",
    POST = "posts",
    USERS="users",
    MINE_POST = "me/posts",
    LIKE_POST = "posts/like",
    COMMENT_POST = "posts/comment",
    TROPHY_POST = "posts/trophy",
    FEED_GENERATE = "generate/feed",
    IMAGE_GENERATE = "generate/image",
    POST_GENERATE = 'generate/feed/post',
    IMAGE_POST = 'generate/image/post',
    SEARCH = "search",
    UPLOAD_IMAGE = "upload/image",
    UPLOAD_VIDEO = "upload/video",
    CREATE_PAYMENT_INTENT="create_payment_intent",
    UPDATE_PAYMENT_INTENT="update_payment_intent",
    COMPLETE_PAYMENT="complete_payment",
    IMAGE_EDIT="generate/edit/image",

    UPDATE_PASSWORD="auth/update-password",
    UPDATE_DETAIL="auth/update-detail",
    UPDATE_PROFILE="auth/update-profile",
    VERIFY_ACCOUNT="auth/verify-email",
    VERIFY_PASSWORD_RESET="auth/verify-password-reset",
    UPDATE_FORGOT_PASSWORD="auth/update-forgot-password",
    PROMPTS="prompts",

    WITHDRAW_REQUEST="withdraw-request",
    CIRCLE="me/circles",
    REPORT_PROBLEM="me/report-problem",

    MAUNAL_TEXT_POST="posts/text",
    MAUNAL_IMAGE_POST="posts/image",
    MAUNAL_VIDEO_POST="posts/video",

    UPDATE_FOLLOWING = "auth/update-following",

    REPORT_POST = "post/report",
    USER_RATING = "user/rating",

    DELETE_PROFILE = "me/delete"
}