import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Review, GetAllReviewParams } from "../types/review";
import type { Pagination, /*TAny*/ } from "../types/common";
import ReviewService from "../services/reviewService";

type ReviewState = {
    reviews: Review[];
    review: Review | null;
    pagination: Pagination | null;
    status: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: ReviewState = {
    reviews: [],
    review: null,
    pagination: null,
    status: false,
    loading: false,
    error: null,
};

export const getReviewList = createAsyncThunk(
    "review/getReviewList", // type
    async (payload: GetAllReviewParams, { rejectWithValue }) => {
        try {
            const response = await ReviewService.getAll(payload);
            return response; // Dữ liệu trả về sẽ nằm ở action.payload
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || "Lỗi không xác định");
            }
            return rejectWithValue("Lỗi không xác định");
        }
    }
);
// export const updateCategory = createAsyncThunk(
//     "category/updateCategory", // type
//     async (payload: TAny, { rejectWithValue }) => {
//         try {
//             const response = await CategoryService.update(payload.id, payload.data);
//             return response; // Dữ liệu trả về sẽ nằm ở action.payload
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err)) {
//                 return rejectWithValue(err.response?.data || "Lỗi không xác định");
//             }
//             return rejectWithValue("Lỗi không xác định");
//         }
//     }
// );

// export const deleteCategory = createAsyncThunk(
//     "category/deleteCategory", // type
//     async ({ id }: TAny, { dispatch, rejectWithValue }) => {
//         try {
//             const response = await CategoryService.delete(id);
//             // cb();
//             dispatch(getCategoryList({}));
//             return response; // Dữ liệu trả về sẽ nằm ở action.payload
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err)) {
//                 return rejectWithValue(err.response?.data || "Lỗi không xác định");
//             }
//             return rejectWithValue("Lỗi không xác định");
//         }
//     }
// );

// export const getCategoryDetail = createAsyncThunk(
//     "category/getCategoryDetail", // type
//     async (id: string, { rejectWithValue }) => {
//         try {
//             const response = await CategoryService.getById(id);
//             return response; // Dữ liệu trả về sẽ nằm ở action.payload
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err)) {
//                 return rejectWithValue(err.response?.data || "Lỗi không xác định");
//             }
//             return rejectWithValue("Lỗi không xác định");
//         }
//     }
// );

// export const createCategory = createAsyncThunk(
//     "category/createCategory", // type
//     async (payload: TAny, { rejectWithValue }) => {
//         try {
//             const response = await CategoryService.create(payload);
//             return response; // Dữ liệu trả về sẽ nằm ở action.payload
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err)) {
//                 return rejectWithValue(err.response?.data || "Lỗi không xác định");
//             }
//             return rejectWithValue("Lỗi không xác định");
//         }
//     }
// );

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // getReviewList
            .addCase(getReviewList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviewList.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getReviewList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi nếu có
            });

        // builder
        //     // getCategoryDetail
        //     .addCase(getCategoryDetail.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(getCategoryDetail.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.category = action.payload;
        //     })
        //     .addCase(getCategoryDetail.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload as string; // Lưu lỗi nếu có
        //     });

        // builder
        //     // createCategory
        //     .addCase(createCategory.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(createCategory.fulfilled, (state) => {
        //         state.loading = false;
        //         state.status = true;
        //     })
        //     .addCase(createCategory.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload as string; // Lưu lỗi nếu có
        //     });

        // builder
        //     // editCategory
        //     .addCase(updateCategory.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(updateCategory.fulfilled, (state) => {
        //         state.loading = false;
        //         state.status = true;
        //     })
        //     .addCase(updateCategory.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload as string; // Lưu lỗi nếu có
        //     });

        // builder
        //     // deleteCategory
        //     .addCase(deleteCategory.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(deleteCategory.fulfilled, (state) => {
        //         state.loading = false;
        //     })
        //     .addCase(deleteCategory.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload as string; // Lưu lỗi nếu có
        //     });
    },
});

// Export actions và reducer
export const { resetStatus } = reviewSlice.actions;
export default reviewSlice.reducer;
