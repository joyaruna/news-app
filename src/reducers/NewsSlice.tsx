import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TrendingNewsState {
    trendingNews: any[]; 
    trendingArticles: any[],
    loading: boolean;
    error: string | null;
}

const initialState: TrendingNewsState = {
    trendingNews: [],
    trendingArticles: [],
    loading: false,
    error: null,
};

export const getTrendingNews = createAsyncThunk<
    any, 
    void,
    { rejectValue: string }
>(
    'news/getTrendingNews',
    async (_, { rejectWithValue }) => {
        const apiKey = 'ff5cc66ab5f6493e80ed1134b6fb8548'; // API Key
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            let errorMessage = 'Something went wrong';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || 'API request failed';
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const getTrendingArticles = createAsyncThunk<
    any, // Response type (adjust if needed)
    void, // Argument type (no arguments in this case)
    { rejectValue: string } // Define error type for `rejectWithValue`
>(
    'news/getTrendingArticles',
    async (_, { rejectWithValue }) => {
        const apiKey = 'ff5cc66ab5f6493e80ed1134b6fb8548'; // API Key
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            let errorMessage = 'Something went wrong';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || 'API request failed';
            }
            return rejectWithValue(errorMessage); // Now correctly typed
        }
    }
);

export const NewsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setTrendingNews: (state, action: PayloadAction<any[]>) => {
            state.trendingNews = action.payload;
        },
        setTrendingArticles: (state, action: PayloadAction<any[]>) => {
            state.trendingNews = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrendingNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTrendingNews.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.trendingNews = action.payload.articles || []; // Ensure articles exist
            })
            .addCase(getTrendingNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Type assertion to fix `unknown` issue
            })
            .addCase(getTrendingArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTrendingArticles.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.trendingArticles = action.payload.articles || []; // Ensure articles exist
            })
            .addCase(getTrendingArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Type assertion to fix `unknown` issue
            });
    },
});

export const { setTrendingNews, setTrendingArticles } = NewsSlice.actions;
export default NewsSlice.reducer;
