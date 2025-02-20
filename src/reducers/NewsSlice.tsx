import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface TrendingNewsState {
    trendingNews: any[]; 
    trendingArticles: any[],
    categories: any[],
    source: any[],
    loading: boolean;
    error: string | null;
}

const initialState: TrendingNewsState = {
    trendingNews: [],
    trendingArticles: [],
    categories:[],
    source: [],
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
            // console.log(response.data)
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
    any,
    void, 
    { rejectValue: string }
>(
    'news/getTrendingArticles',
    async (_, { rejectWithValue }) => {
        const apiKey = 'ff5cc66ab5f6493e80ed1134b6fb8548'; // API Key
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`);
            // console.log(response.data)
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

export const getSources = createAsyncThunk<
    any,
    void, 
    { rejectValue: string }
>(
    'news/getSources',
    async (_, { rejectWithValue }) => {
        const apiKey = '5UamDPBD026PrbWJXdzlCdUXSXKYa9IzjJ57AEaa'; // API Key
        try {
            const response = await axios.get(`https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}`);
            console.log(response.data.data, 'nnnnnn')
            return response.data.data;
        } catch (error) {
            let errorMessage = 'Something went wrong';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || 'API request failed';
            }
            return rejectWithValue(errorMessage); 
        }
    }
);


export const getCategories = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>(
    "news/getCategories",
    async (_, { rejectWithValue }) => {
        const apiKey = 'ihOze5nPiB0Z5XUInRe1yisNc7AgxGZq'; // API Key
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${apiKey}`);
            // console.log(response.data.results)
            return response.data.results;
        } catch (error) {
            let errorMessage = 'Something went wrong';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || 'API request failed';
            }
            return rejectWithValue(errorMessage); 
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
        setCategories: (state, action: PayloadAction<any[]>) => {
            state.categories = action.payload;
        },
        setSources: (state, action: PayloadAction<any[]>) => {
            state.source = action.payload;
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
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.categories = action.payload || [];
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Type assertion to fix `unknown` issue
            })
            .addCase(getSources.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSources.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.source = action.payload || [];
                // console.log(action.payload);
            })
            .addCase(getSources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Type assertion to fix `unknown` issue
            });
    },
});

export const { setTrendingNews, setTrendingArticles, setCategories, setSources } = NewsSlice.actions;
export default NewsSlice.reducer;
